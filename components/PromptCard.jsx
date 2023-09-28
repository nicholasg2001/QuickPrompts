"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const[copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const handleClick = () => {
    handleTagClick();
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded_full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
              </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
              </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={ () => handleClick && handleTagClick
        (post.tag)}
      >
        {post.tag}
        </p>
        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <button className="px-4 py-2 font-inter text-sm text-white bg-blue-500 rounded-xl cursor-pointer hover:bg-blue-700"
            onClick={handleEdit}>
              Edit
            </button>
            <button className="px-4 py-2 font-inter text-sm text-white bg-red-500 rounded-xl cursor-pointer hover:bg-red-700"
            onClick={handleDelete}>
              Delete
            </button>
            </div>
        )}
    </div>
  )
}

export default PromptCard