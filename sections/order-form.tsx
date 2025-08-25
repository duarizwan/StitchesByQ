"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type MeasurementFields = {
  bust: string;
  waist: string;
  hips: string;
  shoulderLength: string;
  armLength: string;
  [key: string]: string;
};

export function OrderForm() {
  const [step, setStep] = useState(1);
  const [measurements, setMeasurements] = useState<MeasurementFields>({
    bust: "",
    waist: "",
    hips: "",
    shoulderLength: "",
    armLength: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", measurements);
  };

  return (
    <section className="py-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Place Your Order
          </h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((itemStep) => (
              <div
                key={itemStep}
                className={`flex items-center ${itemStep < 3 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= itemStep
                      ? "bg-coral-red text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {itemStep}
                </div>
                {itemStep < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > itemStep ? "bg-coral-red" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Basic Information
                </h2>
                <Input type="text" placeholder="Full Name" required />
                <Input type="tel" placeholder="Phone Number" required />
                <Input type="email" placeholder="Email Address" required />
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full"
                >
                  Next Step
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Measurements</h2>
                {Object.keys(measurements).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-2 capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <Input
                      type="number"
                      placeholder={`Enter ${field} measurement in inches`}
                      value={measurements[field]}
                      onChange={(e) =>
                        setMeasurements({
                          ...measurements,
                          [field]: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                ))}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full"
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full"
                  >
                    Next Step
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <Input
                  type="text"
                  placeholder="Design Reference (URL or Description)"
                  required
                />
                <textarea
                  placeholder="Additional Notes"
                  className="w-full min-h-[150px] rounded-md border border-charcoal/20 bg-white px-3 py-2"
                />
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="w-full"
                  >
                    Previous
                  </Button>
                  <Button type="submit" className="w-full">
                    Submit Order
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
