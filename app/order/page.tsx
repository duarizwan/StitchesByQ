"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { createClient } from "@/lib/supabase/client";
import type { User, OrderInsert, MeasurementType } from "@/types/supabase";

interface OrderFormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  alternateContact: string;
  email: string;
  address: string;
  dressType: string;
  measurementType: MeasurementType;
  shoulder: string;
  sleeveLength: string;
  chestWidth: string;
  neckMeasurement: string;
  waistMeasurement: string;
  hipMeasurement: string;
  bottomLength: string;
  sample: string;
  delivery: string;
  deliveryDateTime: string;
}

interface FormErrors {
  [key: string]: string;
}

interface MeasurementDisplay {
  top: boolean;
  bottom: boolean;
}

export default function OrderPage() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<OrderFormData>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    alternateContact: "",
    email: "",
    address: "",
    dressType: "",
    measurementType: "top" as MeasurementType, // Set default value
    shoulder: "",
    sleeveLength: "",
    chestWidth: "",
    neckMeasurement: "",
    waistMeasurement: "",
    hipMeasurement: "",
    bottomLength: "",
    sample: "",
    delivery: "",
    deliveryDateTime: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showMeasurements, setShowMeasurements] = useState<MeasurementDisplay>({
    top: false,
    bottom: false,
  });

  const dressTypes: string[] = [
    "Simple Suit",
    "Formal Suit",
    "Suit with Dori Piping",
    "Lining Suit",
    "Lining with Dori Piping",
    "Party Wear",
    "Bridal Dress",
    "Saree",
    "Lehenga",
    "Salwar Kameez",
    "Kurta",
    "Simple Abaya",
    "Fancy Abaya",
    "Kids' Clothing",
    "Gowns",
    "Jumpsuit",
    "Shirt",
    "Trouser",
    "Shrugs",
    "Tote Bags",
    "Others",
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        } else {
          setUser(user as User | null);

          if (user) {
            setFormData((prev) => ({
              ...prev,
              email: user.email || "",
              firstName: user.user_metadata?.first_name || "",
              lastName: user.user_metadata?.last_name || "",
            }));
          }
        }
      } catch (error) {
        console.error("Unexpected error fetching user:", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    getUser();
  }, [supabase.auth]);

  useEffect(() => {
    const measurementType = formData.measurementType;
    setShowMeasurements({
      top: measurementType === "top" || measurementType === "both",
      bottom: measurementType === "bottom" || measurementType === "both",
    });
  }, [formData.measurementType]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case "firstName":
      case "lastName":
        return !value.trim() ? "This field is required" : "";
      case "contactNumber":
        return !/^[0-9]{11}$/.test(value)
          ? "Provide a valid 11-digit number"
          : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Provide a valid email address"
          : "";
      case "dressType":
      case "measurementType":
        return !value ? "Please select an option" : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const newErrors: FormErrors = {};
    const requiredFields: (keyof OrderFormData)[] = [
      "firstName",
      "lastName",
      "contactNumber",
      "email",
      "dressType",
      "measurementType",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      alert("Please complete all required fields before proceeding.");
      return;
    }

    try {
      // Create properly typed order data
      const orderData: OrderInsert = {
        user_id: user?.id || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        contact_number: formData.contactNumber,
        alternate_contact: formData.alternateContact || null,
        email: formData.email,
        address: formData.address || null,
        dress_type: formData.dressType,
        measurement_type: formData.measurementType as MeasurementType,
        shoulder: formData.shoulder || null,
        sleeve_length: formData.sleeveLength || null,
        chest_width: formData.chestWidth || null,
        neck_measurement: formData.neckMeasurement || null,
        waist_measurement: formData.waistMeasurement || null,
        hip_measurement: formData.hipMeasurement || null,
        bottom_length: formData.bottomLength || null,
        sample: formData.sample || null,
        delivery: formData.delivery || null,
        delivery_date_time: formData.deliveryDateTime || null,
      };

      const { error } = await (supabase as any).from("orders").insert([orderData]);

      if (error) {
        throw new Error(`Failed to submit order: ${error.message}`);
      }

      alert("✅ Order submitted successfully!");

      // Reset form
      setFormData({
        firstName: user?.user_metadata?.first_name || "",
        lastName: user?.user_metadata?.last_name || "",
        contactNumber: "",
        alternateContact: "",
        email: user?.email || "",
        address: "",
        dressType: "",
        measurementType: "top" as MeasurementType, // Reset to default
        shoulder: "",
        sleeveLength: "",
        chestWidth: "",
        neckMeasurement: "",
        waistMeasurement: "",
        hipMeasurement: "",
        bottomLength: "",
        sample: "",
        delivery: "",
        deliveryDateTime: "",
      });
    } catch (error) {
      console.error("Order submission failed", error);
      alert("❌ Something went wrong while submitting your order.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
      }
      router.push("/login");
    } catch (error) {
      console.error("Unexpected sign out error:", error);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-red mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  const inputClassName = (fieldName: string): string => `
    w-full px-3 py-3 bg-neutral-900 border rounded-md text-neutral-100 placeholder-neutral-400 
    transition-colors focus:outline-none focus:ring-1 focus:ring-coral-red
    ${errors[fieldName] ? "border-red-500 bg-red-900/20" : "border-neutral-600"}
  `;

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-15"
      style={{ backgroundImage: "url('/assets/gallery/contact.jpg')" }}
    >
      <Container className="pt-16">
        <Card className="max-w-4xl mx-auto bg-neutral-950/95 backdrop-blur-sm border border-neutral-800 shadow-xl">
          <div className="p-8 lg:p-12">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold text-white text-center">
                Place Your Order
              </h1>
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-white text-sm">
                    Welcome, {user.user_metadata?.first_name || user.email}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    className="bg-red-600 text-white hover:bg-red-700"
                    type="button"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>

            {!user ? (
              <div className="text-center">
                <p className="text-lg text-neutral-300 mb-6">
                  Please sign in to place an order.
                </p>
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-coral-red text-white rounded-full px-8 py-3 hover:bg-coral-red/90"
                  type="button"
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={inputClassName("firstName")}
                      placeholder="Enter your first name"
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={inputClassName("lastName")}
                      placeholder="Enter your last name"
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className={inputClassName("contactNumber")}
                      placeholder="03001234567"
                      required
                    />
                    {errors.contactNumber && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClassName("email")}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-white text-sm font-medium mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={inputClassName("address")}
                      placeholder="Enter your full address"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Order Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">
                    Order Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Dress Type *
                      </label>
                      <select
                        name="dressType"
                        value={formData.dressType}
                        onChange={handleInputChange}
                        className={inputClassName("dressType")}
                        required
                      >
                        <option value="">Select dress type</option>
                        {dressTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.dressType && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.dressType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Measurement Type *
                      </label>
                      <select
                        name="measurementType"
                        value={formData.measurementType}
                        onChange={handleInputChange}
                        className={inputClassName("measurementType")}
                        required
                      >
                        <option value="">Select measurement type</option>
                        <option value="top">Top only</option>
                        <option value="bottom">Bottom only</option>
                        <option value="both">Both (Top & Bottom)</option>
                      </select>
                      {errors.measurementType && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.measurementType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Measurements */}
                  {(showMeasurements.top || showMeasurements.bottom) && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-white">
                        Measurements
                      </h4>

                      {showMeasurements.top && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-white text-sm mb-1">
                              Shoulder
                            </label>
                            <input
                              type="text"
                              name="shoulder"
                              value={formData.shoulder}
                              onChange={handleInputChange}
                              className={inputClassName("shoulder")}
                              placeholder="inches"
                            />
                          </div>
                          <div>
                            <label className="block text-white text-sm mb-1">
                              Sleeve Length
                            </label>
                            <input
                              type="text"
                              name="sleeveLength"
                              value={formData.sleeveLength}
                              onChange={handleInputChange}
                              className={inputClassName("sleeveLength")}
                              placeholder="inches"
                            />
                          </div>
                          <div>
                            <label className="block text-white text-sm mb-1">
                              Chest Width
                            </label>
                            <input
                              type="text"
                              name="chestWidth"
                              value={formData.chestWidth}
                              onChange={handleInputChange}
                              className={inputClassName("chestWidth")}
                              placeholder="inches"
                            />
                          </div>
                          <div>
                            <label className="block text-white text-sm mb-1">
                              Neck
                            </label>
                            <input
                              type="text"
                              name="neckMeasurement"
                              value={formData.neckMeasurement}
                              onChange={handleInputChange}
                              className={inputClassName("neckMeasurement")}
                              placeholder="inches"
                            />
                          </div>
                        </div>
                      )}

                      {showMeasurements.bottom && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-white text-sm mb-1">
                              Waist
                            </label>
                            <input
                              type="text"
                              name="waistMeasurement"
                              value={formData.waistMeasurement}
                              onChange={handleInputChange}
                              className={inputClassName("waistMeasurement")}
                              placeholder="inches"
                            />
                          </div>
                          <div>
                            <label className="block text-white text-sm mb-1">
                              Hip
                            </label>
                            <input
                              type="text"
                              name="hipMeasurement"
                              value={formData.hipMeasurement}
                              onChange={handleInputChange}
                              className={inputClassName("hipMeasurement")}
                              placeholder="inches"
                            />
                          </div>
                          <div>
                            <label className="block text-white text-sm mb-1">
                              Length
                            </label>
                            <input
                              type="text"
                              name="bottomLength"
                              value={formData.bottomLength}
                              onChange={handleInputChange}
                              className={inputClassName("bottomLength")}
                              placeholder="inches"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className={`
    w-full py-4 text-lg rounded-full
    bg-white text-black
    hover:bg-neutral-700 hover:text-white hover:rounded-full
    active:bg-green-600 active:text-white
    transition
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            )}
          </div>
        </Card>
      </Container>
    </main>
  );
}
