const MessageSkeleton = () => {
  return (
    <>
      {/* Sol taraf (Mesajı gönderenin avatarı ve mesajları) */}
      <div className="flex gap-3 items-center">
        {/* Avatar için skeleton */}
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>

        {/* Mesaj içeriği için skeleton */}
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-40"></div>{" "}
          {/* Gönderici ismi için skeleton */}
          <div className="skeleton h-4 w-40"></div>{" "}
          {/* Mesaj metni için skeleton */}
        </div>
      </div>

      {/* Sağ taraf (Mesajı alanın avatarı ve mesajları) */}
      <div className="flex gap-3 items-center justify-end">
        {/* Mesaj içeriği için skeleton */}
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-40"></div>{" "}
          {/* Mesaj metni için skeleton */}
        </div>

        {/* Avatar için skeleton */}
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
      </div>
    </>
  );
};
export default MessageSkeleton;
