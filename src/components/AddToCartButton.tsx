interface Props {
    counter: number;
    onClicked(count: number): void;
}

export default function AddToCartButton(props: Props) {
    return (
        <div className="justify-around flex flex-row items-center md:self-start">
            {props.counter && props.counter > 0 ?
                <div className="w-full flex h-12 gap-2 justify-around items-center">
                    <button onClick={() => props.onClicked(props.counter - 1)} className="transition hover:text-[#f1bb4e] border-2 border-slate-300 bg-slate-200 rounded-md w-10 h-10 text-xl">
                        -
                    </button>
                    <p className="">{props.counter}</p>
                    <button onClick={() => props.onClicked(props.counter + 1)} className="transition hover:text-[#f1bb4e] border-2 border-slate-300 bg-slate-200 rounded-md w-10 h-10 text-xl">
                        +
                    </button>
                </div>
                :
                <button onClick={() => props.onClicked(1)} className="bg-[#f1bb4e] w-full md:h-12 inline-block py-2 px-2 rounded-md box-border decoration-none font-sans font-medium text-white text-center transition-colors hover:bg-[#d1a246] text-md">
                    Lisa ostukorvi
                </button>
            }
        </div>
    );
}