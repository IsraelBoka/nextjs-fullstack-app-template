import Image from "next/image";

export default function Custom404() {
  return (
    <div className="flex justify-center">
            <div className="flex  mt-10 w-96 flex-col justify-center">
        <Image 
        src={'/astronaute.png'}
        alt='test'
        height={400}
        width={500}
        />
        <div className="flex justify-center">404 erreur - Nous n&apos;avons pas pu trouver votre page.</div>
    </div>

    </div>
  );
}
