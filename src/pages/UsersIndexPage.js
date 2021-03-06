import { useEffect, useState } from "react";

import PageLoader from "../components/PageLoader";
import Title from "../components/Title";
import UsersApi from "../api/usersApi";
import UsersTable from "../tables/UsersTable";

export default function UsersIndexPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchUsers() {
			try {
				setLoading(true);
				let { data } = await UsersApi.getAll();
				setUsers(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchUsers();
	}, []);
	return (
		<div>
			<Title className="mb-4">All Users {users?.length > 0 && `(${users.length})`}</Title>
			<PageLoader loading={loading}>
				<UsersTable users={users} />
			</PageLoader>
		</div>
	);
}
