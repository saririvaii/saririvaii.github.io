import CMSImage from "./CMSImage";
import { TypedObject } from "sanity";
import RichTextBlock from '@/components/ui/RichTextBlock'

type ImageDescriptionCardItem = {
    upperText?: string;
    image?: {
        _type?: string;
        asset?: {
            _ref?: string;
            _type?: string;
        };
        alt?: string;
        [key: string]: any;
    };
    bottomText?: TypedObject[];
};

type ImageDescriptionCardProps = {
    cards: ImageDescriptionCardItem[];
    numbered?: boolean;
};

export default function ImageDescriptionCard({
    cards,
    numbered = false,
}: ImageDescriptionCardProps) {
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
        return null;
    }

    return (
        <div className="w-full flex flex-row gap-4 items-stretch">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="flex-1 flex flex-col justify-between bg-white rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-black-main/5"
                >
                    {/* Card Number */}
                    {numbered && (
                        <div className="px-4 pt-4 pb-2">
                            <span className="text-button font-sans text-black-main border border-black-main rounded-full p-2 px-4">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>
                    )}
                    
                    {/* Upper Text */}
                    {card.upperText && (
                        <p className="text-body font-sans text-black-main leading-relaxed px-4">
                            {card.upperText}
                        </p>
                    )}

                    {/* Image */}
                    {card.image && (
                        <div className="w-full !m-0">
                            <CMSImage
                                image={card.image}
                                className="w-full h-auto !m-0"
                            />
                        </div>
                    )}

                    {/* Bottom Text */}
                    {card.bottomText && (
                        <RichTextBlock 
                            value={card.bottomText} 
                            elementClassNames={
                                {
                                    p: "text-body font-sans text-black-main leading-relaxed px-4",
                                }
                            }
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
