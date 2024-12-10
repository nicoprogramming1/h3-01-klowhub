const MemberTitle = () => {
  return (
    <div className="flex flex-col  justify-center p-4 sm:px-8 w-full h-full bg-[url('/images/dashboard/headerLigh1.png')] bg-cover bg-center  dark:bg-[url('/images/dashboard/header1.png')]  rounded-sm gap-y-4 sm:gap-y-6">
      <div className="flex flex-col w-full gap-y-2 text-gray-800 dark:text-primary text-shadow-white dark:text-shadow-none">
        <h2 className="text-lg font-semibold">Conecta con Expertos </h2>
        <p className="text-sm">
          Aprende de los mejores: Impulsa tu conocimiento con nuestros mentores
          especializados
        </p>
      </div>
    </div>
  );
};

export default MemberTitle;
