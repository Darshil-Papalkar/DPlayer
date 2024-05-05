import Image from "next/image"

const ImageSlices = () => {
  return (
    <div className="slice-container">
        <div className="slice">
          <Image alt="" src={"/login_poster_1.jpg"} width={600} height={1200} />
        </div>
        <div className="slice">
          <Image
            alt=""
            src={"/login_poster_2.webp"}
            width={600}
            height={1200}
          />
        </div>
        <div className="slice">
          <Image alt="" src={"/login_poster_3.jpg"} width={600} height={1200} />
        </div>
      </div>
  );
};

export default ImageSlices;