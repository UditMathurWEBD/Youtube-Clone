import Comment from "./comments";

function CommentArea(props){
    return <>
    <div className="mt-10">
        <h1 className="text-white font-bold">11,221 Comments</h1>
    <form className="mt-6">
    <textarea className="text-white border-b border-gray-400 w-[-webkit-fill-available] focus-visible:outline-none" placeholder="Enter your Comment"></textarea>
    <div className="text-right">
  <button className="text-white px-4 mt-4 py-2 bg-[#272727] rounded-4xl">Comment</button>
    </div>
  </form>
  <Comment/>
    <Comment/>
      <Comment/>
   
    </div>
    </>
}


export default CommentArea;