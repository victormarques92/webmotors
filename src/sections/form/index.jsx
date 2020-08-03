import React, { Component } from "react";
import swal from "sweetalert";
import "./styles.scss";

import * as WebmotorsService from "../../domain/services/webmotos";

import Button from "../../components/button";
import Card from "../../components/card";
import Loading from "../../components/loading";
import Select from "../../components/select";

export default class Form extends Component {
	state = {
		showLoading: false,
		showLoadingVehicles: false,

		brands: [],
		brandId: "",

		models: [],
		modelId: "",

		versions: [],
		versionId: "",

		vehicles: []
	};

	componentDidMount() {
		this.loadBrands();
	}

	render() {
		return this.state.showLoading ? (
			<Loading />
		) : <>
				<div className="form">
					<div className="row">
						<div className="col">
							<h1 className="title">Comprar carro</h1>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-3">
							<Select
								label="Marca"
								id="brand"
								onSelect={(brandId) =>
									this.setState({ brandId }, () => {
										this.loadModels(this.state.brandId);
									})
								}
								data={this.state.brands}
								value={this.state.brands.find(
									(brand) => brand.id === this.state.brandId
								)}
								validate={() => this.state.brandId !== ""}
								errorMessage="Campo obrigatório"
							/>
						</div>
						<div className="col-lg-3">
							<Select
								label="Modelos"
								id="models"
								onSelect={(modelId) => this.setState({ modelId }, () => {
									this.loadVersions(this.state.modelId)
								})}
								data={this.state.models}
								value={this.state.models.find(
									(model) => model.id === this.state.modelId
								)}
								validate={() => this.state.modelId !== ""}
								errorMessage="Campo obrigatório"
							/>
						</div>
						<div className="col-lg-3">
							<Select
								label="Versões"
								id="versions"
								onSelect={(versionId) => this.setState({ versionId })}
								data={this.state.versions}
								value={this.state.versions.find(
									(version) => version.id === this.state.versionId
								)}
								validate={() => this.state.versionId !== ""}
								errorMessage="Campo obrigatório"
							/>
						</div>
						<div className="col-lg-3">
							<Button onClick={() => { this.loadVehicles() }}>Ver ofertas</Button>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row result">
						{
							this.state.showLoadingVehicles
								? <Loading />
								: this.state.vehicles.length > 0 &&
								this.state.vehicles.map(vehicle => (
									<div className="col-md-6 col-lg-4">
										<Card
											image={vehicle.Image}
											make={vehicle.Make}
											model={vehicle.Model}
											version={vehicle.Version}
											price={vehicle.Price}
											yearModel={vehicle.YearModel}
											yearFab={vehicle.YearFab}
											km={vehicle.KM}
										/>
									</div>
								))
						}
					</div>
				</div>
			</>
	}

	// ==========================================
	// 									Functions
	// ==========================================
	showLoading(showLoading) {
		this.setState({ showLoading });
	}

	// Marcas
	loadBrands() {
		WebmotorsService.loadBrands()
			.then((data) => {
				this.onLoadBrands(data);
				this.showLoading(false);
			})
			.catch((err) => {
				this.failureLoadBrands();
				this.showLoading(false);
			});
	}

	onLoadBrands(brands) {
		this.setState({ brands });
	}

	failureLoadBrands() {
		swal({
			icon: "error",
			text: "Error ao carregar as marcas, tente novamente.",
		});
	}

	// Modelos
	loadModels() {
		WebmotorsService.loadModels(this.state.brandId)
			.then((data) => {
				this.onLoadModels(data);
			})
			.catch(() => {
				this.failureLoadModels();
			});
	}

	onLoadModels(models) {
		this.setState({ models });
	}

	failureLoadModels() {
		swal({
			icon: "error",
			text: "Error ao carregar os modelos, tente novamente.",
		});
	}

	// Versões
	loadVersions() {
		WebmotorsService.loadVersions(this.state.modelId)
			.then((data) => {
				this.onLoadVersions(data);
			})
			.catch(() => {
				this.failureLoadVersions();
			});
	}

	onLoadVersions(versions) {
		this.setState({ versions });
	}

	failureLoadVersions() {
		swal({
			icon: "error",
			text: "Error ao carregar as versões, tente novamente.",
		});
	}

	// Veículls
	loadVehicles() {
		this.setState({ showLoadingVehicles: true })

		WebmotorsService.loadVehicles()
			.then((data) => {
				this.onLoadVehicles(data);
				this.setState({ showLoadingVehicles: false })
			})
			.catch(() => {
				this.failureLoadVehicles();
				this.setState({ showLoadingVehicles: false })
			});
	}

	onLoadVehicles(vehicles) {
		this.setState({ vehicles });
	}

	failureLoadVehicles() {
		swal({
			icon: "error",
			text: "Error ao carregar os veículos, tente novamente.",
		});
	}
}
