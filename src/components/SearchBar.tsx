import { ReactElement } from "react";

interface Props {
    onChanged(query: string): void,
    placeholder: string
}

export default function SearchBar(props: Props): ReactElement {
    return (
        <input
            placeholder={props.placeholder}
            onChange={(text) => props.onChanged(text?.target.value)}
            className='w-full h-full p-2'
        />
    );
}
