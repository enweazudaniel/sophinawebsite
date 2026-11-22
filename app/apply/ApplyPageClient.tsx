"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { SchoolMap } from "@/components/school-map"

export type ApplyContent = {
  heroImage: string
  heroTitle: string
  heading: string
  text: string
  helpTitle: string
  helpText: string
  success: string
  phone1: string
  phone2: string
  address1: string
  address2: string
}

export default function ApplyPageClient({ content }: { content: ApplyContent }) {
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
          src={content.heroImage}
          alt="Faculty & Staff"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center px-4 drop-shadow-lg">{content.heroTitle}</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding container-premium">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-primary mb-6">{content.heading}</h2>
              <p className="text-lg text-muted-foreground leading-8 mb-6">
                {content.text}
              </p>
              <div className="card-premium bg-muted/50 border-primary/20">
                <p className="text-lg font-semibold text-primary mb-3">{content.helpTitle}</p>
                <p className="text-muted-foreground">
                  {content.helpText}
                  <br />
                  <span className="font-semibold text-foreground">{content.phone1}, {content.phone2}</span>
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
                  {content.success}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="rounded-md bg-red-100 p-4 text-center font-medium text-red-800">
                  Sorry, your application could not be sent. Please try again or call {content.phone1}.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <SchoolMap address1={content.address1} address2={content.address2} phone1={content.phone1} phone2={content.phone2} />
    </div>
  )
}
