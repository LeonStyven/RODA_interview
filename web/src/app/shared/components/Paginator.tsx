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
                <button 
                    className="join-item btn-disabled" 
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Anterior
                </button>
            ) : <button 
                    className="join-item btn btn" 
                    onClick={goPrev}
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Anterior
                </button>
            }
            
            <button className="join-item btn"> Página {page} / {maxPage} </button>

            {!canNext ? (
                <button 
                    className="join-item btn-disabled" 
                >
                    Siguiente <FontAwesomeIcon icon={faChevronRight} />
                </button>
            ) : <button 
                    className="join-item btn btn" 
                    onClick={goNext}
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Anterior
                </button>
            }
        </div> 
    );

}