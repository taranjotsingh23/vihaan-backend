
import pickle
import sys

def main():
  model = pickle.load(open('./Final_ML_Model800.pkl', 'rb'))
  
  age = int(sys.argv[1])
  gender = int(sys.argv[2])
  tiredness = int(sys.argv[3])
  compulsive_behavior = int(sys.argv[4])
  panic_attacks = int(sys.argv[5])
  mood_swings = int(sys.argv[6])
  obsessive_thinking = int(sys.argv[7])
  depression = int(sys.argv[8])
  anxiety = int(sys.argv[9])
  lack_concentration = int(sys.argv[10])
  section_8 = int(sys.argv[11])
  live_parents = int(sys.argv[12])
  hospitalized = int(sys.argv[13])

  # age = 0
  # gender = 0
  # tiredness = 0
  # compulsive_behavior = 0
  # panic_attacks = 0
  # mood_swings = 0
  # obsessive_thinking = 0
  # depression = 0
  # anxiety = 0
  # lack_concentration = 0
  # section_8 = 0
  # live_parents = 0
  # hospitalized = 0

  result = model.predict([[age,gender,tiredness,compulsive_behavior,panic_attacks,mood_swings,obsessive_thinking,depression,anxiety,lack_concentration,section_8,live_parents,hospitalized]])[0]
  print(result)
  # print(hospitalized)

if __name__ == '__main__':
  main()
  sys.stdout.flush()