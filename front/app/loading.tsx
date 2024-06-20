import Image from "next/image";

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-90">
      <Image
        className="img-fluid"
        width={250}
        height={250}
        alt="loading"
        src={"/loading.svg"}
        unoptimized={true}
      />
    </div>
  );
}

export default Loading;
