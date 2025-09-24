import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import React from "react";


type Props = {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
    className?: string;
}

export default function Paginator({ page, pageSize, total, onChange, className = "" }: Props) {
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
        <div className={`mt-3 flex items-center gap-2 ${className}`}>
        <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className="rounded-md border px-3 py-1 disabled:opacity-50"
            aria-label="Página anterior"
        >
            <FontAwesomeIcon icon={faChevronLeft} />
             Anterior
        </button>
        <span className="text-sm text-neutral-600">
            Página {page} / {maxPage}
        </span>
        <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className="rounded-md border px-3 py-1 disabled:opacity-50"
            aria-label="Página siguiente"
        >
            Siguiente 
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
        </div>
    );

}

