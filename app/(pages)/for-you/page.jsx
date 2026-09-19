export default function ForYou() {
  return (
    <div className="max-w-5xl w-full mx-auto py-6">
      <div className="px-10 w-full">
        <div>
          <div className="text-xl font-bold text-[#032b41]">
            Selected just for you
          </div>
          <a
            href=""
            className="flex justify-between w-2/3 bg-[#fbefd6] rounded-md p-6 mb-6 gap-6"
          >
            <div className="text-[#032b41] w-2/5">
              How Constant Innovation Creates Radically Successful Businesses
            </div>
            <div className="w-0.5 bg-[#bac8ce]"/>
            <div className="flex gap-4 w-7/12">
              <figure className="h-32 w-32 min-w-32">
                <img src=".../assets/TheLeanStartup" alt="" className="w-full h-full" />
              </figure>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
