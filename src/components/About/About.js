import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Octokit } from '@octokit/rest';
import styles from './About.module.css';
import classnames from 'classnames';
import Pagination from '@material-ui/lab/Pagination';


const octokit = new Octokit();
class About extends React.Component {
	state = {
		isLoading: true,
		userData: [],
		repoList: [],
		fetchFailure: false,
		currentPage: 1,
    	perPage: 3
	}

	componentDidMount() {
		this.requestRepolist(this.state.perPage, this.state.currentPage);

		octokit.users.getByUsername({
		  username: 'ZyabrovaOlga'
		}).then(({data}) => {
			this.setState({
				userData: data
			})	
		}).catch(() => {
			this.setState({
				fetchFailure: true
			})
		});

		
	};
	requestRepolist = (perPage, selectedPage) => {	
		octokit.repos.listForUser({
			username: 'ZyabrovaOlga',
			per_page: perPage,
			page: selectedPage
		}).then(({ data }) => {
			this.setState ({
				repoList: data,
				isLoading: false,
				currentPage: selectedPage
			})	
		}).catch(() => {
			this.setState({
				fetchFailure: true
			})
		});
	};
	

	render() {
		const { isLoading, userData, repoList, fetchFailure, currentPage, perPage} = this.state;
		const switchPage = (event, page) => {
			this.requestRepolist(perPage, page);
		  };
		
		return (
			<div className={styles.wrap}>
			<div>
        		<p className={styles.mark}>Разработано в WebHeroSchool</p>
        	</div>
			<h1 className={styles.title}>{ isLoading ? <CircularProgress /> : 'Обо мне' }</h1>
				<div className={styles.about}>
					<img className={styles.img} src={ userData.avatar_url } alt="avatar" />
					<div className={styles.user}>
						<div className={styles.block}>
							<h2 className={styles.name}>{userData.name}</h2>
							<span className={styles.bio}>{userData.bio}</span>
						    <span className={styles.location}>{userData.location}</span>
						</div>
						<div className={styles.social}>
					    	<a href={userData.html_url} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"><g fill="none" stroke="#434A54" stroke-linecap="round" stroke-miterlimit="1" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="10"/><path d="M8.548 15.751c.004.67.011 1.619.011 1.81M12.53 17.517c0-.252.009-1.646.009-2.669 0-.713-.245-1.178-.519-1.415 1.702-.19 3.49-.836 3.49-3.77 0-.835-.297-1.517-.787-2.052.08-.192.341-.97-.075-2.022 0 0-.64-.206-2.1.783-.61-.17-1.364-.254-2.014-.257-.65.003-1.403.088-2.012.257-1.46-.989-2.103-.783-2.103-.783-.414 1.052-.153 1.83-.074 2.022a2.957 2.957 0 00-.787 2.051c0 2.928 1.784 3.584 3.482 3.777-.219.19-.317 1.58-.385 2.074-.436.195-1.543.533-2.224-.636 0 0-.404-.733-1.172-.787"/></g></svg></a>
							<a href="https://t.me/ziabrovaa" target="_blank" rel="noopener noreferrer"><svg height="21" viewBox="0 0 24 24" width="21" xmlns="http://www.w3.org/2000/svg"><path d="M12 24c6.617 0 12-5.383 12-12S18.617 0 12 0 0 5.383 0 12s5.383 12 12 12zm0-22.5c5.79 0 10.5 4.71 10.5 10.5S17.79 22.5 12 22.5 1.5 17.79 1.5 12 6.21 1.5 12 1.5z" fill="#434A54"/><path d="M7.896 14.155l1.568-.681-.44.441a.75.75 0 00-.22.53v2.935c0 .672.812.998 1.28.53l1.574-1.574 3.43 1.715a.75.75 0 001.073-.537l1.957-10.761a.751.751 0 00-1.012-.833L4.39 10.897a.75.75 0 00-.13 1.331L7.194 14.1c.21.134.475.155.702.055zm8.506-6.347l-1.537 8.455-3.02-1.509a.748.748 0 00-.865.141l-.676.676v-.813l3.007-3.007c.583-.583-.073-1.545-.829-1.218l-4.817 2.09-1.354-.864z" fill="#434A54"/></svg></a>
							<a href="https://www.instagram.com/ziabrovaaa/?hl=ru" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"><circle cx="10.5" cy="10.5" r="10" fill="none" stroke="#434A54" stroke-linecap="round" stroke-miterlimit="1" stroke-linejoin="round"/><path d="M14.01 16.5H6.99a2.49 2.49 0 01-2.49-2.49V6.99A2.49 2.49 0 016.99 4.5h7.02a2.49 2.49 0 012.49 2.49v7.02a2.49 2.49 0 01-2.49 2.49z" fill="none" stroke="#434A54" stroke-linecap="round" stroke-miterlimit="1" stroke-linejoin="round"/><circle cx="10.5" cy="10.5" r="2.96" fill="none" stroke="#434A54" stroke-linecap="round" stroke-miterlimit="1" stroke-linejoin="round"/><circle cx="13.98" cy="7.02" r=".94" fill="#434A54"/></svg></a>
							<a href="https://vk.com/olga_ziabrova" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"><g fill="none" stroke="#434A54" stroke-linecap="round" stroke-miterlimit="1" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="10"/><path d="M4.5 6.5c.2 2.08 2.76 8 6 8v-8M16.5 6.5c-.3 1.98-2.32 5-6 5M16.5 14.5c-.3-1.188-2.32-3-6-3"/></g></svg></a>
						</div>
					</div>	
				</div>
				<div className={styles.rp}>
					<h3 className={styles.my}>Мои репозитории</h3>
					{!isLoading && <div className={styles.li}>
						{repoList.map(repo => (<div className={styles.button} key={repo.id}><a href={repo.html_url} target="_blank" rel="noopener noreferrer">
							<div className={styles.top}>
								<span className={styles.namerepo}>{repo.name}</span>
								<div className={styles.block_wrap}>
									<p className={styles.desc}>{repo.description}</p>
									<span className={styles.repo_lang}>
										<span className={classnames({
											[styles.language]: true,
											[styles.html_language]: repo.language === 'HTML',
											[styles.css_language]: repo.language === 'CSS',
											[styles.js_language]: repo.language === 'JavaScript',
											})}>
										</span>
										{repo.language}
									</span>
								</div>
							</div>
						</a>
						</div>))}
					</div>}
				</div>
				<Pagination 
					onChange={switchPage} 
					page={currentPage} 
					className={styles.pagination} 
					count={Math.ceil(userData.public_repos/ perPage)} 
					shape="rounded" 
					variant="outlined"
				/>
				{fetchFailure && <h2>Ошибка, что-то пошло не так</h2>}
			
			</div>
		);
	}	
}
	

export default About;