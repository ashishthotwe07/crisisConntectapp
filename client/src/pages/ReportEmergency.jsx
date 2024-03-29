import React from "react";
import Layout from "../components/Layout";
import { FiPhone, FiUsers, FiBook } from "react-icons/fi";
import EmergencyReportForm from "../components/EmergencyForm";

export default function ReportEmergency() {
  return (
    <Layout>
      <section className="bg-blue-50 dark:bg-slate-800" id="contact">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 ">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                Report Emergency
              </h2>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                  In case of an emergency, please fill out the form below to
                  report the incident. If you require immediate assistance,
                  please contact emergency services.
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <FiPhone className="h-6 w-6" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Police: 911
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Fire Department: 911
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <FiUsers className="h-6 w-6" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Nearby Volunteers
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Connect with{" "}
                        <a href="/volunteers" className="text-blue-500">
                          volunteers
                        </a>{" "}
                        in your area who are ready to assist during emergencies.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <FiBook className="h-6 w-6" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Emergency Resources
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Find more{" "}
                        <a href="/resources" className="text-blue-500">
                          emergency resources
                        </a>{" "}
                        and information.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <EmergencyReportForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
