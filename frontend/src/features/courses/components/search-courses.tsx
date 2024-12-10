import PartBody from "@/components/part-body";
import SearchComponent from "@/components/search";

const SearchCourses = () => {
  return (
    <PartBody
      className="gap-y-2"
      description={"Encuentra el aprendizaje que estás buscando"}
    >
      <SearchComponent placeholder={"Busca cursos"} navigate={true} />
    </PartBody>
  );
};

export default SearchCourses;
