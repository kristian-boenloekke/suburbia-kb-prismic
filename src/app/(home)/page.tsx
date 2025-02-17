import { Metadata } from "next";
import { isFilled, asImageSrc, Content } from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle("homepage")
  const slices = bundleTextImageSlices(page.data.slices)

  // console.log('slices', slices);

  //bundleImageTextSlices(), er for at komme text_image slices i en samlet div
  // som skal defineres i return af page.tsx. Derfor skal vi ændrer

  // return <SliceZone slices={page.data.slices} components={components} />; til


  return <SliceZone
    slices={slices}
    components={{
      ...components,
      text_image_bundle: ({
        slice,
      }: SliceComponentProps<TextImageBundleSlice>) => (
        <div>
           <SliceZone slices={slice.slices} components={components} />
      </div>
      )
    }}
  />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}

type TextImageBundleSlice = {
  id: string
  slice_type: 'text_image_bundle'
  slices: Content.TextImageSlice[]
}

function bundleTextImageSlices(
  slices: Content.HomepageDocumentDataSlicesSlice[]
) {
  const result: (
    | Content.HomepageDocumentDataSlicesSlice
    | TextImageBundleSlice
  )[] = []

  for (const slice of slices) {
    if (slice.slice_type !== 'text_image') {
      result.push(slice)
      continue
    }

    const bundle = result.at(-1)
    if (bundle?.slice_type === 'text_image_bundle') {
      bundle.slices.push(slice)
    } else {
      //her danner vi det nye array af slices
      result.push({
        id: `${slice.id}-bundle`,
        slice_type: 'text_image_bundle',
        slices: [slice]
      })
    }
  }

  return result
}