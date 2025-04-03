import AllListing from "@/components/AllListing";
import Hero from "@/components/Hero";
import SearchInput from "@/components/SearchItems";
import SubscriptionMetrics from "@/components/Stats";

const Home = async () => {
  return (
    <div className="container mx-auto p-4">
      <Hero />
      <SubscriptionMetrics />
      <SearchInput />
      <AllListing />
    </div>
  );
};

export default Home;
