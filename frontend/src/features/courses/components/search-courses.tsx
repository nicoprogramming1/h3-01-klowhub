import PartBody from "@/components/part-body";
import SearchComponent from "@/components/search";

const SearchCourses = () => {
  return (
    <PartBody
      className=""
      description={"Encuentra el aprendizaje que estás buscando"}
    >
      <SearchComponent placeholder={"Busca cursos"} navigate={true} />
    </PartBody>
  );
};

export default SearchCourses;
