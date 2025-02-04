interface SearchPostListProps {
  keyword: string;
}

const SearchPostList = ({ keyword }: SearchPostListProps) => {
  return (
    <div className="w-[80%] h-full bg-gray-200 dark:bg-gray-700 ">
      <h1>검색 결과</h1>
    </div>
  );
};

export default SearchPostList;
