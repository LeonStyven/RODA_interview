import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


type Props = {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
    className?: string;
}

export default function Paginator({ page, pageSize, total, onChange }: Props) {
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    const canPrev = page > 1;
    const canNext = page < maxPage;

    function goPrev() {
        if (!canPrev) return;
        onChange(page - 1);
    }
    function goNext() {
        if (!canNext) return;
        onChange(page + 1);
    }

    return (

        <div className="join">
            {!canPrev ? (
                <button className="join-item btn btn-disabled">
                    <FontAwesomeIcon icon={faChevronLeft} /> Anterior
                </button>
            ) : <button 
                    className="join-item btn btn text-base-100" 
                    onClick={goPrev}
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Anterior
                </button>
            }
            
            <button className="join-item btn btn-disabled"> Página {page} / {maxPage} </button>

            {!canNext ? (
                <button className="join-item btn btn-disabled ">
                    Siguiente <FontAwesomeIcon icon={faChevronRight} />
                </button>
            ) : <button 
                    className="join-item btn btn text-base-100" 
                    onClick={goNext}
                >
                    Siguiente <FontAwesomeIcon icon={faChevronRight} />
                </button>
            }
        </div> 
    );

}