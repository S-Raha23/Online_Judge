import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import './Home.css'; // Optional custom styles

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptance: '48.2%',
    tags: ['Array', 'Hash Table']
  },
  {
    id: 2,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    acceptance: '34.7%',
    tags: ['String', 'Sliding Window']
  },
  {
    id: 3,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    acceptance: '30.5%',
    tags: ['Array', 'Binary Search', 'Divide and Conquer']
  },
  {
    id: 4,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    acceptance: '45.9%',
    tags: ['Stack']
  },
  {
    id: 5,
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    acceptance: '42.3%',
    tags: ['Linked List', 'Heap', 'Divide and Conquer']
  },
];

const Home = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">LeetCode Problems</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Acceptance</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>
                <Link to={`/problem/${problem.id}`} className="text-decoration-none">
                  {problem.title}
                </Link>
              </td>
              <td className={`text-${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </td>
              <td>{problem.acceptance}</td>
              <td>{problem.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Utility to color difficulty
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'Hard':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default Home;
