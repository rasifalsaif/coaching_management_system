import { PublicHeader } from "@/components/layout/public-header";
import { TeacherShowcase } from "@/components/layout/teacher-showcase";
import { GraduationCap, BookOpen, Users, Trophy, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  <Trophy className="h-4 w-4" />
                  Leading Coaching Center in Bangladesh
                </span>
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
                Master Your Future with <span className="text-blue-600">Expert Guidance</span>
              </h1>
              <p className="mt-8 text-xl text-gray-600 leading-relaxed">
                Unlock your potential with our specialized programs for Science, Commerce, and Arts. 
                Experience interactive learning with the country's top educators.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 hover:bg-blue-700 sm:w-auto"
                >
                  <GraduationCap className="h-5 w-5" />
                  Apply for Admission
                </Link>
                <Link
                  href="#features"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-8 py-4 text-lg font-bold text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
                >
                  Explore Courses
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </section>

        {/* Features / Why Us Section */}
        <section id="features" className="py-24 border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose CCMS?</h2>
              <p className="mt-4 text-lg text-gray-600">We provide more than just lessons; we provide a pathway to success.</p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Structured Curriculum</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive study materials and daily practice sheets tailored for board exams and university admission.
                </p>
              </div>
              
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Personalized Mentorship</h3>
                <p className="text-gray-600 leading-relaxed">
                  Small batch sizes ensure every student gets individual attention and doubt-clearing sessions.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Regular Assessments</h3>
                <p className="text-gray-600 leading-relaxed">
                  Weekly class tests and monthly model tests to track performance and build exam-hall confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher Showcase Section (Server Component) */}
        <TeacherShowcase />

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl bg-blue-600 p-12 text-center text-white shadow-2xl shadow-blue-200">
              <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl">Ready to Start Your Journey?</h2>
              <p className="mb-10 text-xl text-blue-100">
                Join hundreds of successful students who achieved their dreams with CCMS.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-lg transition-all hover:-translate-y-1 hover:bg-gray-50"
              >
                Enroll Now
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CCMS Coaching Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
