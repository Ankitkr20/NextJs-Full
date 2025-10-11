"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const autoplay = Autoplay({ delay: 2500, stopOnInteraction: false });

  return (
    <>
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white min-h-screen">
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            True Feedback — Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel Section */}
        <Carousel
          plugins={[autoplay]}
          className="w-full max-w-sm sm:max-w-md md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="p-3 sm:p-4 flex justify-center"
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full bg-white text-gray-900">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail
                      className="flex-shrink-0 text-blue-600"
                      aria-label="message icon"
                    />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-between w-full mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-gray-300">
        © {new Date().getFullYear()} True Feedback. All rights reserved.
      </footer>
    </>
  );
}
