interface Props {
    counter: number;
    onClicked(count: number): void;
}

export default function AddToCartButton(props: Props) {
    return (
        <>
            {props.counter && props.counter > 0 ?
                <div className="justify-between flex flex-row items-center w-full">
                    <button onClick={() => props.onClicked(props.counter - 1)} className="transition hover:text-[#f1bb4e] border-2 border-slate-300 bg-slate-200 rounded-md w-10 h-10 text-xl">
                        -
                    </button>
                    <p className="">{props.counter}</p>
                    <button onClick={() => props.onClicked(props.counter + 1)} className="transition hover:text-[#f1bb4e] border-2 border-slate-300 bg-slate-200 rounded-md w-10 h-10 text-xl">
                        +
                    </button>
                </div>
                :
                <button onClick={() => props.onClicked(1)} className="w-full bg-[#f1bb4e] inline-block py-1 px-2 border-4 border-[#f1bb4e] rounded-md box-border decoration-none font-sans font-medium text-white text-center transition-all hover:border-slate-100 text-md">Lisa ostukorvi</button>
            }
        </>

    );
}