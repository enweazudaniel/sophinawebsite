import { MapPin, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

// Exact pin of Sophina School on Google Maps (free, no account or API key needed).
const LAT = 6.2092263
const LNG = 6.5603047

const embedUrl = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`

export function SchoolMap() {
  return (
    <section className="section-padding container-premium">
      <div className="text-center mb-12">
        <h2 className="text-primary mb-4">Visit Us</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Come and see Sophina School for yourself. We would love to show you around.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <div className="card-elevated space-y-6 md:col-span-1">
          <div className="flex gap-3">
            <MapPin className="h-6 w-6 shrink-0 text-primary" />
            <p className="text-muted-foreground leading-relaxed">
              <span className="block font-semibold text-foreground">School Address</span>
              Off Polytechnic Road
              <br />
              Ogwashi-Uku, Delta State, 320109
            </p>
          </div>
          <div className="flex gap-3">
            <Phone className="h-6 w-6 shrink-0 text-primary" />
            <p className="text-muted-foreground leading-relaxed">
              <span className="block font-semibold text-foreground">Call Us</span>
              <a href="tel:07038046878" className="hover:underline">07038046878</a>
              <br />
              <a href="tel:08027446756" className="hover:underline">08027446756</a>
            </p>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6">
              <Navigation className="mr-2 h-5 w-5" />
              Get Directions
            </Button>
          </a>
        </div>
        <div className="md:col-span-2 min-h-[320px] overflow-hidden rounded-2xl shadow-xl">
          <iframe
            src={embedUrl}
            title="Map showing the location of Sophina School"
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
