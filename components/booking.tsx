"use client";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import Link from "next/link";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  techExperience: string;
  laptopAccess: string;
  laptopSpecFile?: File | null;
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
    techExperience: "",
    laptopAccess: "",
    laptopSpecFile: null,
  });


  const [errors, setErrors] = useState<FormErrors>({});
  const [isComplete, setIsComplete] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
const refreshPage = () => {
  window.location.reload();
}


  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Background Info", icon: User },
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
    if (!formData.techExperience.trim()) {
      (newErrors as FormErrors).techExperience = "Please select your tech experience level";
    }
    if (formData.laptopAccess === "No") {
      (newErrors as FormErrors).laptopAccess = "A laptop is required to join this bootcamp";
      setErrors(newErrors);
      return false;
    }
    if (!formData.laptopAccess.trim()) {
      (newErrors as FormErrors).laptopAccess = "Laptop access is required";
    } else if (formData.laptopAccess === "Yes" && !formData.laptopSpecFile) {
      (newErrors as FormErrors).laptopSpecFile = "Laptop specification file is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step);
  };

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFinalSubmit = async () => {
    try {
      setApiLoading(true);
      setApiError(null);

      // Here you’d send formData to your backend
      console.log("Submitting registration:", formData);

      setTimeout(() => {
        setIsComplete(true);
        setApiLoading(false);
      }, 1500);
    } catch (error) {
      setApiError("Something went wrong. Please try again.");
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={`${errors.name ? "border-red-500" : "border-gray-300"} h-10 text-sm`}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@gmail.com"
                  className={`${errors.email ? "border-red-500" : "border-gray-300"} h-10 text-sm`}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234 809 342 3456"
                  className={`${errors.phone ? "border-red-500" : "border-gray-300"} h-10 text-sm`}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
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
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <User className="w-5 h-5 mx-auto text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-1">
                Background Information
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Experience
                </label>
                <select
                  value={formData.techExperience}
                  onChange={(e) => handleInputChange("techExperience", e.target.value)}
                  className={`${errors.techExperience ? "border-red-500" : "border-gray-300"} h-10 text-sm w-full rounded-md border`}
                >
                  <option value="">Select experience level</option>
                  <option value="None">None</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.techExperience && <p className="text-red-500 text-xs">{errors.techExperience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have access to a laptop?
                </label>
                <select
                  value={formData.laptopAccess}
                  onChange={(e) => handleInputChange("laptopAccess", e.target.value)}
                  className={`${errors.laptopAccess ? "border-red-500" : "border-gray-300"} h-10 text-sm w-full rounded-md border`}
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.laptopAccess && <p className="text-red-500 text-xs">{errors.laptopAccess}</p>}
              </div>

              {formData.laptopAccess === "Yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Laptop Specifications (PDF, image)
                  </label>
                  <Input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) =>
                      handleInputChange("laptopSpecFile", e.target.files?.[0] ?? null)
                    }
                    className={`${errors.laptopSpecFile ? "border-red-500" : "border-gray-300"} h-10 text-sm`}
                  />
                  {errors.laptopSpecFile && <p className="text-red-500 text-xs">{errors.laptopSpecFile}</p>}
                </div>
              )}
            </div>
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
              <h4 className="font-semibold text-gray-900 mb-2">Your Information:</h4>
              <p><span className="font-medium">Name:</span> {formData.name}</p>
              <p><span className="font-medium">Email:</span> {formData.email}</p>
              <p><span className="font-medium">Phone:</span> {formData.phone}</p>
              <p><span className="font-medium">Gender:</span> {formData.gender}</p>
              <p><span className="font-medium">Tech Experience:</span> {formData.techExperience}</p>
              <p><span className="font-medium">Laptop Access:</span> {formData.laptopAccess}</p>
              {formData.laptopAccess === "Yes" && (
                <p><span className="font-medium">Laptop Spec File:</span> {formData.laptopSpecFile?.name ?? "—"}</p>
              )}
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <p className="text-red-800 text-xs">{apiError}</p>
              </div>
            )}
          </div>
        );
    }
  };

  if (isComplete) {
    return (
      <section className="py-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg mx-auto px-4 w-full">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mt-3">
              Registration Successful! 🎉
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              You'll receive a confirmation email shortly.
            </p>

            <Link href="">
              <Button onClick={refreshPage} variant="ghost" className="mt-4 rounded-lg border-purple-500 border w-full h-10">
                Done
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 w-full">
        {/* ⬇️ Wider form */}
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
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

            <CardContent className="p-4 ">
              <div className="max-h-[500px] overflow-y-auto">
                {renderStepContent()}
              </div>

              <div className="flex space-x-3 mt-6">
                {(currentStep === 2 || currentStep === 3) && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 border-purple-300 text-purple-600 hover:bg-pink-50 text-sm h-10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}

                {currentStep === 1 && (
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white text-sm h-10"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}

                {currentStep === 2 && (
                  <Button
                    onClick={() => {
                      if (validateStep2()) {
                        setCurrentStep(3);
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm h-10"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}

                {currentStep === 3 && (
                  <Button
                    onClick={handleFinalSubmit}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm h-10"
                    disabled={apiLoading}
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
      </div>
    </section>
  );
}