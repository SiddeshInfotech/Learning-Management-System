import mongoose, { Schema, Document } from "mongoose";

export interface IFile {
  url: string;
  publicId?: string;
  fileType?: string;
  fileSize?: number;
}

export interface IStudent extends Document {
  courseDetails: {
    learningMedium: string;
    installmentName: string;
  };

  basicDetails: {
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    fullName: string;
    dateOfBirth: Date;
    age: number;
    gender: string;
    fatherName: string;
    motherName: string;
    motherTongue: string;
    nationality: string;
  };

  addressDetails: {
    addressType: string;
    pinCode: string;
    country: string;
    state: string;
    district: string;
    taluka: string;
    city: string;
    landmark?: string;
    addressLine1: string;
    addressLine2?: string;
    suburb?: string;
  };

  contactDetails: {
    mobileNumber: string;
    whatsappNumber?: string;
    parentNumber?: string;
    email: string;
  };

  educationDetails: {
    schoolName: string;
    standard: string;
    city: string;
  };

  documents: {
    photo?: IFile;
    signature?: IFile;
    admissionFormFront?: IFile;
    admissionFormBack?: IFile;
  };

  healthDetails: {
    physicallyDisabled: boolean;
    bloodGroup?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const fileSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
    fileType: { type: String },
    fileSize: { type: Number }
  },
  { _id: false }
);

const studentSchema = new Schema(
  {
    courseDetails: {
      learningMedium: String,
      installmentName: String
    },

    basicDetails: {
      title: String,
      firstName: { type: String, required: true },
      middleName: String,
      lastName: { type: String, required: true },
      fullName: String,
      dateOfBirth: Date,
      age: Number,
      gender: String,
      fatherName: String,
      motherName: String,
      motherTongue: String,
      nationality: String
    },

    addressDetails: {
      addressType: String,
      pinCode: String,
      country: String,
      state: String,
      district: String,
      taluka: String,
      city: String,
      landmark: String,
      addressLine1: String,
      addressLine2: String,
      suburb: String
    },

    contactDetails: {
      mobileNumber: { type: String, required: true },
      whatsappNumber: String,
      parentNumber: String,
      email: { type: String, required: true, unique: true }
    },

    educationDetails: {
      schoolName: String,
      standard: String,
      city: String
    },

    documents: {
      photo: fileSchema,
      signature: fileSchema,
      admissionFormFront: fileSchema,
      admissionFormBack: fileSchema
    },

    healthDetails: {
      physicallyDisabled: { type: Boolean, default: false },
      bloodGroup: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>("Student", studentSchema);