"use client";

import { BannerHome } from "@/app/components/bannerHome/bannerHome";
import { CardDogs } from "@/app/components/cardDogs/cardDogs";
import { CardService } from "@/app/components/cardServices/cardService";
import { Footer } from "@/app/components/footer/footer";
import { InfoPoly } from "@/app/components/infoPoly/infoPoly";
import { Menu } from "@/app/components/nav/nav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  /*const router = useRouter();
  useEffect(() => {
    router.push("/loginPage");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  return (
    <>

      <header>
        <div>
          <Menu></Menu>
          <BannerHome></BannerHome>
        </div>
      </header>
      <main>
        <InfoPoly></InfoPoly>
        <CardService></CardService>
        <CardDogs></CardDogs>
      </main>
      <Footer></Footer>
    </>
  );
}