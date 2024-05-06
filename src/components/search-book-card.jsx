function SearchBookCard({ data }) {
   return (
      <div className="bg-[#FBFBFB] max-sm:mx-auto max-sm:max-w-96 shadow-xl rounded-lg relative group">
         <div className="absolute top-4 right-4 invisible group-hover:visible  bg-white flex items-center gap-3 p-2  rounded-lg"></div>
         <div className="p-1 mb-2">
            <img
               src={
                  data?.cover ||
                  "https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg"
               }
               alt={data?.title}
               className="max-w-full aspect-auto mx-auto w-full object-fill h-[310px] rounded-lg"
            />
         </div>
         <div className="p-4">
            <p className="text-xl leading-none text-[#3D3D3D] mb-2">{data?.title}</p>
            <div className="flex items-center justify-between">
               <span className="text-base text-gray-600">{data?.author}</span>
               <span className="text-[#9654F4] bg-[#EFE6FD] inline-block px-4 rounded-3xl">{data?.pages}</span>
            </div>
         </div>
      </div>
   );
}

export default SearchBookCard;
