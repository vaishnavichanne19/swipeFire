import { CircleCheckBig } from "lucide-react";

export default function Amc () {
    return (
              <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    
    <h1 className="text-center">
      Annual Maintenance Contract (AMC)
    </h1>

    <div className="bg-white mt-5 shadow-xs rounded-2xl p-8 max-w-4xl mx-auto">
      
      <p className="text-gray-600 mb-6">
        In our Annual Maintenance Contract, we will provide....
      </p>

      <ul className="space-y-4 text-gray-700">
        <li className="flex gap-3 items-center"> <CircleCheckBig size={20} color="#c20016"/> Complete Health Checkup of the system. </li>
        <li className="flex gap-3 items-center"> <CircleCheckBig size={20} color="#c20016"/> We will train a particular person for regular maintenance checkup.</li>
        <li className="flex gap-3 items-center"> <CircleCheckBig size={20} color="#c20016"/> We will issue form "B" certificate in our annual maintenance contract.</li>
        <li className="flex gap-3 items-center"> <CircleCheckBig size={20} color="#c20016"/> We also provide Comprehensive & Non-Comprehensive Contract. </li>
      </ul>

      <div className="my-8 border-t border-gray-200"></div>

      <div className="grid md:grid-cols-2 gap-6">
        
        <div className="p-4 bg-red-50 rounded-xl">
          <h3 className="mb-2 !text-[#c20016]">
            Comprehensive Contract
          </h3>
          <p className="text-gray-600">
            Complete maintenance will belong to us, in that in case of any  part replacement is needed will be done by us only.
          </p>
        </div>

        <div className="p-4 bg-red-50  rounded-xl">
          <h3 className=" mb-2 !text-[#c20016]">
            Non-Comprehensive Contract
          </h3>
          <p className="text-gray-600">
          In Non-Comprehensive Contract we will only examine the system & in case of replacement of any part if needed, the part will be provided by you.
          </p>
        </div>

      </div>

    </div>
  </div>
</section>
    )
}