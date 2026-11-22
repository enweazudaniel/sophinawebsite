"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { SchoolMap } from "@/components/school-map"

export default function ApplyPageClient() {
  const emptyForm = { firstName: "", lastName: "", phone: "", classApplyingFor: "", message: "" }
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const classOptions = [
    "Creche",
    "Pre-Nursery",
    "Nursery 1",
    "Nursery 2",
    "Nursery 3",
    "Basic 1",
    "Basic 2",
    "Basic 3",
    "Basic 4",
    "Basic 5",
    "JSS 1",
    "JSS 2",
    "JSS 3",
    "SS 1",
    "SS 2",
    "SS 3",
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const response = await fetch("https://submit-form.com/HtcilwBDD", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus("success")
        setFormData(emptyForm)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
        <Image
          src="https://i.ibb.co/yFD8y6Hf/PXL-20250326-094408031.jpg"
          alt="Faculty & Staff"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center px-4 drop-shadow-lg">Apply Now</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding container-premium">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-primary mb-6">Applications for the 2026-27 School Year are now open!</h2>
              <p className="text-lg text-muted-foreground leading-8 mb-6">
                At Sophina School, we believe in providing a rigorous and inclusive educational
                environment for every learner. We welcome students from all backgrounds and look forward to reviewing your
                application.
              </p>
              <div className="card-premium bg-muted/50 border-primary/20">
                <p className="text-lg font-semibold text-primary mb-3">Have Questions?</p>
                <p className="text-muted-foreground">
                  Contact our admissions office:
                  <br />
                  <span className="font-semibold text-foreground">07038046878, 08027446756</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="card-elevated animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="firstName" className="text-base font-semibold text-foreground mb-2 block">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                  className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="text-base font-semibold text-foreground mb-2 block">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                  className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold text-foreground mb-2 block">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. 0803 000 0000"
                />
              </div>

              <div>
                <Label htmlFor="classApplyingFor" className="text-base font-semibold text-foreground mb-2 block">Class Applying For</Label>
                <select
                  id="classApplyingFor"
                  name="classApplyingFor"
                  value={formData.classApplyingFor}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-md border border-input bg-background px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select a class</option>
                  {classOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="message" className="text-base font-semibold text-foreground mb-2 block">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the child and anything we should know..."
                  className="min-h-[150px] text-base transition-all duration-300 focus:ring-2 focus:ring-primary/50 p-4 rounded-lg"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg transition-all duration-300 hover:shadow-lg"
              >
                {status === "sending" ? "Sending..." : "Submit Application"}
              </Button>

              {status === "success" && (
                <p role="status" className="rounded-md bg-green-100 p-4 text-center font-medium text-green-800">
                  Thank you! We have received your application and will contact you soon.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="rounded-md bg-red-100 p-4 text-center font-medium text-red-800">
                  Sorry, your application could not be sent. Please try again or call 07038046878.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <SchoolMap />
    </div>
  )
}
