"use client";
import { cloudinaryConfig } from "@/lib/cloudinary"
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Ticket,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  User,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { purchaseTicket } from "@/lib/api";
import { useCloudinaryUpload } from "@/lib/use-cloudinary"; // ✅ manual uploader hook
import { config } from "process";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  experience: string;
  laptop: string;
}

type FormErrors = Partial<Record<keyof BookingFormData, string>>;
type Step = 1 | 2 | 3;

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    experience: "",
    laptop: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadedImageId, setUploadedImageId] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [isComplete, setIsComplete] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { uploadFile, isUploading, uploadProgress } = useCloudinaryUpload(); // ✅ hook

  const refreshPage = () => window.location.reload();

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Background Info", icon: Upload },
    { number: 3, title: "Complete", icon: CheckCircle },
  ];

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.experience.trim()) {
      newErrors.experience = "Please select your tech experience level";
    }
    if (formData.laptop === "No") {
      newErrors.laptop = "A laptop is required to join this bootcamp";
    }
    if (!formData.laptop.trim()) {
      newErrors.laptop = "Laptop access is required";
    }
    if (formData.laptop === "Yes" && !uploadedImageUrl) {
      setUploadError("Laptop specification upload is required");
      return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step);
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFinalSubmit = async () => {
    setApiLoading(true);
    setApiError(null);
    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        experience: formData.experience,
        laptop: formData.laptop === "Yes",
        imageUrl: uploadedImageUrl,
      };

      const response = await purchaseTicket(payload);

      if (response.responseSuccessful) {
        setIsComplete(true);
      } else {
        setApiError(response.responseMessage || "Failed to complete registration");
      }
    } catch (error) {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setApiLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <User className="w-5 h-5 mx-auto text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-1">
                Personal Information
              </h3>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Full Name"
                className={`${errors.name ? "border-red-500" : "border-gray-300"} h-10 text-sm`}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email"
                className={`${errors.email ? "border-red-500" : "border-gray-300"} h-10 text-sm`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Phone"
                className={`${errors.phone ? "border-red-500" : "border-gray-300"} h-10 text-sm`}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className={`${errors.gender ? "border-red-500" : "border-gray-300"} h-10 text-sm w-full rounded-md border`}
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <Upload className="w-5 h-5 mx-auto text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-1">
                Background Information
              </h3>
            </div>

            <select
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className={`${errors.experience ? "border-red-500" : "border-gray-300"} h-10 text-sm w-full rounded-md border`}
            >
              <option value="">Select experience level</option>
              <option value="None">None</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}

            <select
              value={formData.laptop}
              onChange={(e) => handleInputChange("laptop", e.target.value)}
              className={`${errors.laptop ? "border-red-500" : "border-gray-300"} h-10 text-sm w-full rounded-md border`}
            >
              <option value="">Do you have a laptop?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.laptop && <p className="text-red-500 text-xs">{errors.laptop}</p>}

           {formData.laptop === "Yes" && (
  <div>
    {!uploadedImageUrl ? (
      <CldUploadWidget
          uploadPreset="payment-upload"
                  options={{
                    maxFiles: 1,
                    folder: "payment-receipts",
                    resourceType: "image",
                    maxFileSize: 10000000,
                    sources: ["local", "camera"],
                    multiple: false,
                    clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp","pdf"],
                  }}
        onSuccess={(results) => {
          if (
            results?.info &&
            typeof results.info === "object" &&
            "secure_url" in results.info
          ) {
            const info = results.info as { secure_url: string; public_id: string };
            setUploadedImageUrl(info.secure_url);
            setUploadedImageId(info.public_id);
            setUploadError(null);
          }
        }}
        onError={() => {
          setUploadError("Upload failed. Try again.");
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => {
              setUploadError(null);
              open(); // opens Cloudinary widget
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm h-10"
          >
            Upload Laptop Specification
          </Button>
        )}
      </CldUploadWidget>
    ) : (
      <div>
        <p className="text-green-600 text-sm">File uploaded successfully ✅</p>
        <Button
          onClick={() => {
            setUploadedImageUrl("");
            setUploadedImageId("");
          }}
          variant="outline"
          className="text-xs h-7"
        >
          Upload Different File
        </Button>
      </div>
    )}
    {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}
  </div>
)}
          </div>
        );

      case 3:
        return (
          <div className="space-y-3">
            <div className="text-center mb-2">
              <CheckCircle className="w-6 h-6 mx-auto text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-1">
                Review & Complete
              </h3>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>Experience:</strong> {formData.experience}</p>
              <p><strong>Laptop:</strong> {formData.laptop}</p>
              {uploadedImageUrl && <p><strong>Laptop Spec:</strong> Uploaded ✅</p>}
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-800">
                {apiError}
              </div>
            )}
          </div>
        );
    }
  };

  if (isComplete) {
    return (
      <section className="py-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 w-full text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
            <h2 className="text-lg font-bold text-gray-900 mt-3">
              Registration Successful 🎉
            </h2>
            <p className="text-sm text-gray-600 mt-2">
Join our Whatsapp Community using https://chat.whatsapp.com/KHMFQxFNPVr5zj3jw8ipFQ?mode=ems_copy_t            </p>
            <Button onClick={refreshPage} variant="ghost" className="mt-4 w-full">
              Done
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 w-full max-w-lg">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 p-4">
            <CardTitle className="flex items-center justify-between text-purple-700 text-base">
              <div className="flex items-center">
                <Ticket className="w-4 h-4 mr-2" />
                <span>Register for Bootcamp</span>
              </div>
              <span className="text-xs">Step {currentStep} of 3</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <div className="max-h-[500px] overflow-y-auto">{renderStepContent()}</div>

            <div className="flex space-x-3 mt-6">
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-purple-300 text-purple-600 hover:bg-pink-50 text-sm h-10"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm h-10"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinalSubmit}
                  disabled={apiLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm h-10"
                >
                  {apiLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}