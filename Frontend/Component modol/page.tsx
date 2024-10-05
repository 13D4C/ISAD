"use client";
import Head from "next/head";
import CharmSchoolComponent from "../components/CharmSchoolComponent";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Charm School</title>
        <meta name="description" content="Charm School Course Information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100 flex justify-center items-center">
        <CharmSchoolComponent />
      </main>
    </div>
  );
};

export default Home;
