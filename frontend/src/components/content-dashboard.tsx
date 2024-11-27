interface Props {
  children: React.ReactNode;
}

const DashboardContent = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center p-4 gap-y-5 h-full w-full sm:px-8 max-w-screen-xl">
        {children}
      </div>
    </div>
  );
};

export default DashboardContent;
