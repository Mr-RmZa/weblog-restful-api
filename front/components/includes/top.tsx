"use client";
function Top() {
  return (
    <div className="position-fixed bottom-0 end-0 mb-3 me-3" id="top">
      <button
        className="btn btn-dark py-2 d-flex align-items-center"
        type="button"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-up my-1"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
          />
        </svg>
      </button>
    </div>
  );
}

export default Top;
