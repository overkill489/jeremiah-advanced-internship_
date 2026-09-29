"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { useRouter } from "next/navigation";

export default function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [openFaq, setOpenFaq] = useState(null);
  const router = useRouter();

  const handleSubscription = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in before choosing a plan.");
      return;
    }

    const subscription = selectedPlan === "yearly" ? "premium-plus" : "premium";

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email || "",
          subscription: subscription,
        },
        { merge: true },
      );

      router.push("/settings");
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  const faqs = [
    {
      question: "How does the free 7-day trial work?",
      answer:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You can cancel any time during your trial and will not be charged. If you love Summarist, you'll be automatically charged after 7 days, and your subscription will renew annually.",
    },
    {
      question:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      answer:
        "Yes, you can switch between subscription plans. Your new subscription will take effect based on your current billing cycle.",
    },
    {
      question: "What's included in the Premium plan?",
      answer:
        "Premium gives you access to Summarist's library of book summaries and audio content.",
    },
    {
      question: "Can I cancel during my trial or subscription?",
      answer: "Yes. You can cancel your subscription at any time.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main>
      <section className="bg-[#032b41] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-8 text-4xl font-bold">
            Get unlimited access to many amazing books to read
          </h1>

          <p className="mx-auto max-w-2xl text-xl">
            Turn ordinary moments into amazing learning opportunities
          </p>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2bd97c] text-xs text-white">
              <FaCheck />
            </div>

            <p className="text-lg text-[#032b41]">
              Key ideas in few minutes with many books to read
            </p>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2bd97c] text-xs text-white">
              <FaCheck />
            </div>

            <p className="text-lg text-[#032b41]">
              3 million people growing with Summarist everyday
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2bd97c] text-xs text-white">
              <FaCheck />
            </div>

            <p className="text-lg text-[#032b41]">
              Precise recommendations collections curated by experts
            </p>
          </div>
        </div>
      </section>
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-xl">
          <button
            type="button"
            onClick={() => setSelectedPlan("yearly")}
            className={`relative mb-6 w-full cursor-pointer rounded-md border-4 p-6 text-left ${
              selectedPlan === "yearly"
                ? "border-[#2bd97c]"
                : "border-[#bac8ce]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedPlan === "yearly"
                    ? "border-[#2bd97c]"
                    : "border-[#bac8ce]"
                }`}
              >
                {selectedPlan === "yearly" && (
                  <div className="h-3 w-3 rounded-full bg-[#2bd97c]" />
                )}
              </div>

              <div>
                <div className="font-semibold text-[#032b41]">Premium Plus</div>

                <div className="text-sm text-[#394547]">Yearly</div>

                <div className="mt-2 font-semibold text-[#032b41]">
                  $99.99/year
                </div>

                <div className="text-sm text-[#394547]">7-day free trial</div>
              </div>
            </div>
          </button>
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#bac8ce]" />
            <span className="text-sm text-[#394547]">or</span>
            <div className="h-px flex-1 bg-[#bac8ce]" />
          </div>
          <button
            type="button"
            onClick={() => setSelectedPlan("monthly")}
            className={`mb-8 w-full cursor-pointer rounded-md border-4 p-6 text-left ${
              selectedPlan === "monthly"
                ? "border-[#2bd97c]"
                : "border-[#bac8ce]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedPlan === "monthly"
                    ? "border-[#2bd97c]"
                    : "border-[#bac8ce]"
                }`}
              >
                {selectedPlan === "monthly" && (
                  <div className="h-3 w-3 rounded-full bg-[#2bd97c]" />
                )}
              </div>

              <div>
                <div className="font-semibold text-[#032b41]">Premium</div>

                <div className="text-sm text-[#394547]">Monthly</div>

                <div className="mt-2 font-semibold text-[#032b41]">
                  $9.99/month
                </div>

                <div className="text-sm text-[#394547]">No trial</div>
              </div>
            </div>
          </button>
          <button
            type="button"
            className="w-full cursor-pointer rounded-md bg-[#2bd97c] py-3 font-semibold text-[#032b41] transition-colors duration-300 hover:bg-[#20a65f]"
            onClick={handleSubscription}
          >
            {selectedPlan === "yearly"
              ? "Start your free 7-day trial"
              : "Start your first month"}
          </button>

          <p className="mt-4 text-center text-xs text-[#394547]">
            Cancel your trial at any time before it ends, and you won't be
            charged.
          </p>
        </div>
      </section>
      <section className="bg-[#f1f6f4] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-[#032b41]">
            Frequently asked questions
          </h2>

          <div>
            {faqs.map((faq, index) => (
              <div key={faq.question} className="border-b border-[#bac8ce]">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full cursor-pointer items-center justify-between py-6 text-left font-semibold text-[#032b41]"
                >
                  <span>{faq.question}</span>

                  <IoIosArrowDown
                    className={`shrink-0 text-xl transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-60 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="leading-7 text-[#394547]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
