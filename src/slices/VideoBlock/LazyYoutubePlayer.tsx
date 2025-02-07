'use client'
import { KeyTextField } from "@prismicio/client";
import { useState, useRef, useEffect } from "react";

// https://blog.webdevsimplified.com/2022-01/intersection-observer/ 

type VideoProps = {
    youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
    const [isInView, setIsInView] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const currentContainerRef = containerRef.current

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    console.log('in view');

                }
            }, { threshold: 0, rootMargin: '1500px' }
        )


        if (currentContainerRef) {
            observer.observe(currentContainerRef)
        }

        return () => {
            if (currentContainerRef) {
                observer.unobserve(currentContainerRef)
            }
        }

    })

    return (
        <div ref={containerRef} className="relative h-full w-full">
            {isInView &&
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="pointer-events-none h-full w-full border-0"
                />
            }
        </div>
    );
}