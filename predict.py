
import pickle
import sys
# import sklearnpip install -U scikit-learn scipy matplotlib

def main():
  Random_Forest = pickle.load(open('./Random_ForestN.pkl', 'rb'))
  employment = sys.argv[1]
  # mentallyIll = sys.argv[2]
  education = sys.argv[2]
  own_computer = sys.argv[3]
  hospitalized = sys.argv[4]
  hospitalized1 = sys.argv[5]
  legally_disabled = sys.argv[6]
  internet = sys.argv[7]
  live_parents = sys.argv[8]
  resume_gap = sys.argv[9]
  total_gap = sys.argv[10]
  income = sys.argv[11]
  unemployed = sys.argv[12]
  read_out_work_school = sys.argv[13]
  income_social_welfare = sys.argv[14]
  food_stamps = sys.argv[15]
  section_8 = sys.argv[16]
  hospitalized_times = sys.argv[17]
  lack_concentration = sys.argv[18]
  anxiety = sys.argv[19]
  depression = sys.argv[20]
  obsessive_thinking = sys.argv[21]
  mood_swings = sys.argv[22]
  panic_attacks = sys.argv[23]
  compulsive_behavior = sys.argv[24]
  tiredness = sys.argv[25]
  age = sys.argv[26]
  gender = sys.argv[27]

  result = Random_Forest.predict([[employment,education,own_computer,hospitalized,hospitalized1,legally_disabled,internet,live_parents,resume_gap,total_gap,income,unemployed,read_out_work_school,income_social_welfare, food_stamps,section_8,hospitalized_times,lack_concentration,anxiety,depression,obsessive_thinking,mood_swings,panic_attacks,compulsive_behavior,tiredness,age,gender]])[0]
  print(result)

if __name__ == '__main__':
  main()
  sys.stdout.flush()