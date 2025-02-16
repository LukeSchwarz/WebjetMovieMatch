import { ChangeEvent, SyntheticEvent } from "react";

interface Props {
    onClick: (e: SyntheticEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    search: string | undefined;
};

const Search = (props: Props) => {

    return(
        <div>
            <input value={props.search} onChange={(e) => props.handleChange(e)}></input>
            <button onClick={(e) => props.onClick(e)} ></button>
        </div>
    )
}

export default Search;