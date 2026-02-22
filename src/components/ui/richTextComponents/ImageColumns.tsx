import CMSImage from "./CMSImage";

interface ImageColumnItem {
    _key?: string;
    image?: {
        asset?: { _ref?: string };
        alt?: string;
        [key: string]: any;
    };
}

interface ImageColumnsProps {
    images?: ImageColumnItem[];
}

export default function ImageColumns({ images }: ImageColumnsProps) {
    if (!images?.length) return null;

    return (
        <div className="w-full flex flex-row gap-2">
            {images.map((item, idx) => {
                if (!item.image?.asset?._ref) return null;

                return (
                    <div
                        key={item._key ?? idx}
                        className="flex-1 flex-shrink-0"
                    >
                        <CMSImage
                            image={item.image}
                            className="w-full h-auto !m-0 rounded-md object-cover"
                        />
                    </div>
                );
            })}
        </div>
    );
}
