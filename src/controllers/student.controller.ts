import { Request, Response } from "express";
import Student from "../models/student.model";


// CREATE STUDENT (START REGISTRATION)
export const createStudent = async (req: Request, res: Response) => {
  try {
    // CLEAN EMPTY EMAIL PROPERLY
    if (req.body?.contactDetails) {
      if (!req.body.contactDetails.email) {
        delete req.body.contactDetails.email;
      }

      // If contactDetails becomes empty → remove it entirely
      if (Object.keys(req.body.contactDetails).length === 0) {
        delete req.body.contactDetails;
      }
    }

    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Student registration started",
      studentId: student._id,
      student
    });

  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error creating student", error });
  }
};


// COMMON UPDATE FUNCTION
export const updateStudent = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // CLEAN EMPTY EMAIL IN UPDATE ALSO
    if (data?.contactDetails) {
      if (!data.contactDetails.email) {
        delete data.contactDetails.email;
      }

      if (Object.keys(data.contactDetails).length === 0) {
        delete data.contactDetails;
      }
    }

    // STEP-WISE VALIDATION

    if (req.path.includes("/basic")) {
      if (!data.basicDetails?.firstName || !data.basicDetails?.lastName) {
        return res.status(400).json({
          message: "First name and Last name are required"
        });
      }
    }

    if (req.path.includes("/contact")) {
      if (!data.contactDetails?.email || !data.contactDetails?.mobileNumber) {
        return res.status(400).json({
          message: "Email and Mobile Number are required"
        });
      }
    }

    if (req.path.includes("/address")) {
      if (!data.addressDetails?.city) {
        return res.status(400).json({
          message: "City is required"
        });
      }
    }

    if (req.path.includes("/education")) {
      if (!data.educationDetails?.qualification) {
        return res.status(400).json({
          message: "Qualification is required"
        });
      }
    }

    if (req.path.includes("/health")) {
      if (data.healthDetails?.physicallyDisabled === undefined) {
        return res.status(400).json({
          message: "Health status is required"
        });
      }
    }

    // UPDATE
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after", runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Step updated successfully",
      student
    });

  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error updating student", error });
  }
};


// UPLOAD DOCUMENTS
export const uploadDocuments = async (req: any, res: any) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { documents: req.body },
      { returnDocument: "after" }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Documents uploaded successfully",
      student
    });

  } catch (error) {
    res.status(500).json({ message: "Error uploading documents" });
  }
};


// DELETE STUDENT
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};


// GET ALL STUDENTS
export const getStudents = async (req: any, res: any) => {
  try {
    const { name, city, page = 1, limit = 10 } = req.query;

    let filter: any = {};

    if (name) {
      filter["basicDetails.firstName"] = { $regex: name, $options: "i" };
    }

    if (city) {
      filter["addressDetails.city"] = city;
    }

    const students = await Student.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      total: students.length,
      students
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};


// GET SINGLE STUDENT
export const getStudentById = async (req: any, res: any) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ message: "Error fetching student" });
  }
};


// DASHBOARD
export const getDashboardStats = async (req: any, res: any) => {
  try {
    const totalStudents = await Student.countDocuments();

    const completedStudents = await Student.countDocuments({
      status: "COMPLETED"
    });

    const confirmedStudents = await Student.countDocuments({
      status: "CONFIRMED"
    });

    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalStudents,
      completedStudents,
      confirmedStudents,
      recentStudents
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};


// CONFIRM REGISTRATION
export const confirmStudent = async (req: any, res: any) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status: "CONFIRMED" },
      { returnDocument: "after" }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student registration confirmed",
      student
    });

  } catch (error) {
    res.status(500).json({ message: "Error confirming student" });
  }
};


// MAKE PAYMENT
export const makePayment = async (req: any, res: any) => {
  try {
    const { amount } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        paymentDetails: {
          amount,
          status: "PAID"
        }
      },
      { returnDocument: "after" }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Payment successful",
      student
    });

  } catch (error) {
    res.status(500).json({ message: "Error processing payment" });
  }
};