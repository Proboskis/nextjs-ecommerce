export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*This div with its tailwind classes centers all the elements inside it, i.e. all of its children.*/
    <div className="flex items-center justify-center h-full w-full">
      {children}
    </div>
  );
}
