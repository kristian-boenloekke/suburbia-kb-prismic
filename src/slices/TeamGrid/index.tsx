import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { createClient } from "@/prismicio";
import React from "react";
import Skater from "./Skater";
import SlideIn from "@/components/SlideIn";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient()
  const skaters = await client.getAllByType('skater')
  const shuffledSkaters = skaters.sort(() => Math.random() - 0.5)

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <SlideIn>

        <Heading size="lg" as="h2" className="mb-8 text-white text-center">
          <PrismicText field={slice.primary.heading} />
        </Heading>

      </SlideIn>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {shuffledSkaters.map((skater, index) => (
          <React.Fragment key={index}>
            {skater.data.first_name && (
              <SlideIn>
                <Skater skater={skater} index={index} />
              </SlideIn>
            )}
          </React.Fragment>

        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
