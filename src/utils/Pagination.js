import {Pagination} from "react-bootstrap";
import { useState } from "react";

//const MAX_PAGES = 10;
const GeneralPagination = (props) => {
    const [active, setActive] = useState(1)
    //const [page, setPage] = useState(0)
    let pages = Math.ceil(props.count/props.size);
    let items = [];

    props.passToParent(active);
    const handleClick= (e) => {
        setActive(parseInt(e.target.innerText));
    }

    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={handleClick} >
                {number}
            </Pagination.Item>,
        );
    }
    return(
            <Pagination>
                <Pagination.First />
                {items}
                <Pagination.Last />
            </Pagination>
    )
}

export default GeneralPagination;