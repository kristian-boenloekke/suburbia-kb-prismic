'use client'
import { Heading } from '@/components/Heading';
import { ColorField, Content, ImageField, isFilled, KeyTextField } from '@prismicio/client'
import { PrismicNextImage, PrismicNextImageProps } from '@prismicio/next';
import clsx from 'clsx';
import React, { ComponentProps, ReactNode, useEffect } from 'react'
import { useCustomizerControls } from './Context';
import { useRouter } from 'next/navigation';

type Props = Pick<
    Content.BoardCustomizerDocumentData,
    "wheels" | "decks" | "metals"
> & {
    className?: string;
}

export default function Controls({ wheels, decks, metals, className }: Props) {
    const router = useRouter()
    const {
        setBolt,
        setDeck,
        setTruck,
        setWheel,
        selectedBolt,
        selectedDeck,
        selectedTruck,
        selectedWheel
    } = useCustomizerControls()

    useEffect(() => {
        const url = new URL(window.location.href)

        if (isFilled.keyText(selectedDeck?.uid))
            url.searchParams.set("deck", selectedDeck.uid)
        if (isFilled.keyText(selectedWheel?.uid))
            url.searchParams.set("wheel", selectedWheel.uid)
        if (isFilled.keyText(selectedTruck?.uid))
            url.searchParams.set("truck", selectedTruck.uid)
        if (isFilled.keyText(selectedBolt?.uid))
            url.searchParams.set("bolt", selectedBolt.uid)

        router.replace(url.href)
    }, [router, selectedBolt, selectedDeck, selectedTruck, selectedWheel])




    return (
        <div className={clsx('flex flex-col gap-6', className)}>
            <Options title="deck" selectedName={selectedDeck?.uid}>
                {decks.map((deck) => (
                    <Option key={deck.uid} imageField={deck.texture} imgixParams={{
                        rect: [20, 1550, 1000, 1000],
                        width: 150,
                        height: 150
                        //vi bruge imgixParams til at modificere billedet så vi kan bruge det samme billede til knapper og board m.v.
                    }}
                        selected={deck.uid === selectedDeck?.uid}
                        onClick={() => setDeck(deck)}
                    >
                        {deck.uid?.replace(/-/g, " ")}

                    </Option>
                ))}

            </Options>
            <Options title="wheels" selectedName={selectedWheel?.uid}>
                {wheels.map((wheel) => (
                    <Option key={wheel.uid} imageField={wheel.texture} imgixParams={{
                        rect: [20, 1550, 1000, 1000],
                        width: 150,
                        height: 150
                    }}
                        selected={wheel.uid === selectedWheel?.uid}
                        onClick={() => setWheel(wheel)}
                    >
                        {wheel.uid?.replace(/-/g, " ")}

                    </Option>
                ))}

            </Options>
            <Options title="trucks" selectedName={selectedTruck?.uid}>
                {metals.map((metal) => (
                    <Option key={metal.uid}
                        colorField={metal.color}
                        selected={metal.uid === selectedTruck?.uid}
                        onClick={() => setTruck(metal)}
                    >
                        {metal.uid?.replace(/-/g, " ")}

                    </Option>
                ))}

            </Options>
            <Options title="bolts" selectedName={selectedBolt?.uid}>
                {metals.map((metal) => (
                    <Option key={metal.uid}
                        colorField={metal.color}
                        selected={metal.uid === selectedBolt?.uid}
                        onClick={() => setBolt(metal)}
                    >
                        {metal.uid?.replace(/-/g, " ")}

                    </Option>
                ))}

            </Options>
        </div>
    )
}


type OptionsProps = {
    title?: ReactNode
    selectedName?: KeyTextField,
    children?: ReactNode
}


function Options({ title, selectedName, children }: OptionsProps) {
    const formattedName = selectedName?.replace(/-/g, " ")
    //replacing hyphens with empty space fx. red-and-black from prismic custom-type


    return (
        <div>
            <div className='flex'>
                <Heading as='h2' size='xs' className='mb-2'>
                    {title}
                </Heading>
                <p className="ml-3 text-zinc-300">
                    <span className='select-none text-zinc-500'> | </span>
                    {formattedName}
                </p>
            </div>
            <ul className='mb-1 flex flex-wrap gap-2'>
                {children}
            </ul>
        </div>
    )

}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
    selected: boolean,
    children: ReactNode,
    onClick: () => void
} & (
        | {
            imageField: ImageField,
            imgixParams?: PrismicNextImageProps["imgixParams"],
            colorField?: never
        }
        | {
            colorField: ColorField,
            imageField?: never,
            imgixParams?: never
        }
    )

function Option({
    children,
    selected,
    imageField,
    imgixParams,
    colorField,
    onClick
}: OptionProps) {
    return (
        <li>
            <button
                className={clsx("size-10 cursor-pointer rounded-full bg-black p-0.5, outline-2 outline-white",
                    selected && 'outline')}
                onClick={onClick}
            >
                {imageField ? (
                    <PrismicNextImage
                        field={imageField}
                        imgixParams={imgixParams}
                        className='pointer-events-none h-full w-full rounded-full'
                        alt=''
                    />
                ) : (
                    <div className='h-full w-full rounded-full' style={{ backgroundColor: colorField ?? undefined }} />

                )}
                <span className='sr-only'>{children}</span>
            </button>
        </li>
    )
}