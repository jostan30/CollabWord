import { useOthers, useSelf } from "@liveblocks/react/suspense";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex px-3">
      {users.map(({ connectionId, info }) => (
        <Avatar key={connectionId} avatar={info.avatar} name={info.name} />
      ))}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar avatar={currentUser.info.avatar} name={currentUser.info.name} />
        </div>
      )}
    </div>
  );
}

export function Avatar({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div
      className="flex items-center justify-center relative border-4 border-white rounded-full w-10 h-10 bg-gray-400 -ml-3"
      data-tooltip={name}
    >
      <img
        src={avatar}
        alt={name}
        className="rounded-full"
        data-tooltip={name}
      />
    </div>
  );
}
