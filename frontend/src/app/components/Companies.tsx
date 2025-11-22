import Image from "next/image";

export default function Companies() {
  return (
    <div className="relative w-[80vw] md:w-[65vw] mx-auto overflow-hidden">
      <div className="flex items-center gap-10 animate-scroll">
        {[
          "logo_assurance-maladie.png",
          "logo-Fnors.png",
          "logo-insee.png",
          "logo-ligue-contre-le-Cancer.png",
          "logo-OCDE.png",
          "logo-OMS.png",
          "logo-sante-gouv.png",
        ].map((image, index) => (
          <div key={index} className="shrink-0">
            <Image
              src={`/images/companies/${image}`}
              alt={`Company ${index + 1}`}
              width={90}
              height={50}
              className="object-contain"
            />
          </div>
        ))}
        {[
          "logo_assurance-maladie.png",
          "logo-Fnors.png",
          "logo-insee.png",
          "logo-ligue-contre-le-Cancer.png",
          "logo-OCDE.png",
          "logo-OMS.png",
          "logo-sante-gouv.png",
        ].map((image, index) => (
          <div key={`duplicate-${index}`} className="shrink-0">
            <Image
              src={`/images/companies/${image}`}
              alt={`Company Duplicate ${index + 1}`}
              width={90}
              height={50}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
